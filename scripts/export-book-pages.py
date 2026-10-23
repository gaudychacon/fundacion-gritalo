"""Render the supplied scans, without redrawing them, into local reading assets.

Usage: python scripts/export-book-pages.py --shawi PATH --ferina PATH
Requires PyMuPDF. Does not alter the source PDFs.
"""
import argparse
from pathlib import Path
import pymupdf


def export(source, age):
    output = Path(__file__).resolve().parents[1] / 'public' / 'books' / age
    output.mkdir(parents=True, exist_ok=True)
    document = pymupdf.open(source)
    for index, page in enumerate(document):
        if age == '6-9' and index:
            page.set_rotation(270)
        rect = page.rect
        if not index:
            regions = [('cover', rect)]
        else:
            left = pymupdf.Rect(0, 0, rect.width / 2, rect.height)
            right = pymupdf.Rect(rect.width / 2, 0, rect.width, rect.height)
            left_name = 'cutouts' if age == '6-9' else 'title'
            regions = [(left_name if index == 1 else f'page-{index * 2 - 2}', left),
                       ('song' if age == '6-9' and index == 7 else f'page-{index * 2 - 1}', right)]
        for name, clip in regions:
            scale = 1200 / clip.width
            pixmap = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), clip=clip, alpha=False)
            pixmap.save(output / f'{name}.jpg', jpg_quality=90)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--shawi', required=True, type=Path)
    parser.add_argument('--ferina', required=True, type=Path)
    args = parser.parse_args()
    export(args.shawi, '6-9')
    export(args.ferina, '10-15')
