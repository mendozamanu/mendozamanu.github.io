from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "files" / "manuel-mendoza-hurtado-cv.pdf"

NAVY = colors.HexColor("#10283F")
TEAL = colors.HexColor("#07797D")
GOLD = colors.HexColor("#C68B18")
INK = colors.HexColor("#1B2B35")
MUTED = colors.HexColor("#53636C")
PAPER = colors.HexColor("#F7F3EC")
LINE = colors.HexColor("#D9D4CB")
WHITE = colors.white

PAGE_W, PAGE_H = A4
MARGIN_X = 16 * mm
TOP = 31 * mm
BOTTOM = 15 * mm


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 23 * mm, PAGE_W, 23 * mm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawString(MARGIN_X, PAGE_H - 11.2 * mm, "Manuel Mendoza Hurtado")
    canvas.setFont("Helvetica", 8.4)
    canvas.drawString(
        MARGIN_X,
        PAGE_H - 17 * mm,
        "Lecturer in Computer Science - PhD in Advanced Computing, Energy and Plasmas",
    )
    canvas.setFillColor(TEAL)
    canvas.rect(0, PAGE_H - 24.2 * mm, PAGE_W, 1.2 * mm, fill=1, stroke=0)

    canvas.setStrokeColor(LINE)
    canvas.line(MARGIN_X, 11 * mm, PAGE_W - MARGIN_X, 11 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.2)
    canvas.drawString(
        MARGIN_X,
        7 * mm,
        "Public academic CV - Updated 25 July 2026",
    )
    canvas.drawRightString(
        PAGE_W - MARGIN_X,
        7 * mm,
        f"Page {doc.page}",
    )
    canvas.restoreState()


class CVDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=MARGIN_X,
            rightMargin=MARGIN_X,
            topMargin=TOP,
            bottomMargin=BOTTOM,
            title="Public curriculum vitae - Manuel Mendoza Hurtado",
            author="Manuel Mendoza Hurtado",
            subject="Public academic curriculum vitae in English",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
            id="main",
        )
        self.addPageTemplates(
            [PageTemplate(id="cv", frames=[frame], onPage=footer)]
        )


styles = getSampleStyleSheet()
body = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=8.4,
    leading=11.2,
    textColor=INK,
    spaceAfter=3.5,
)
small = ParagraphStyle(
    "Small",
    parent=body,
    fontSize=7.5,
    leading=9.7,
    textColor=MUTED,
)
section = ParagraphStyle(
    "Section",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=11,
    leading=13,
    textColor=NAVY,
    spaceBefore=6,
    spaceAfter=5,
    keepWithNext=True,
)
entry_title = ParagraphStyle(
    "EntryTitle",
    parent=body,
    fontName="Helvetica-Bold",
    fontSize=8.7,
    leading=11,
    textColor=NAVY,
    spaceAfter=1.5,
)
entry_meta = ParagraphStyle(
    "EntryMeta",
    parent=small,
    fontName="Helvetica-Bold",
    textColor=TEAL,
    spaceAfter=2,
)
publication = ParagraphStyle(
    "Publication",
    parent=small,
    fontSize=7.35,
    leading=9.4,
    textColor=INK,
    leftIndent=8,
    firstLineIndent=-8,
    spaceAfter=4.3,
)
label = ParagraphStyle(
    "Label",
    parent=small,
    fontName="Helvetica-Bold",
    fontSize=7,
    leading=8.6,
    textColor=GOLD,
    uppercase=True,
)
contact = ParagraphStyle(
    "Contact",
    parent=small,
    fontSize=7.4,
    leading=9.5,
    textColor=INK,
)


def p(text, style=body):
    return Paragraph(text, style)


def section_title(number, title):
    return Table(
        [
            [
                Paragraph(number, label),
                Paragraph(title, section),
            ]
        ],
        colWidths=[12 * mm, None],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("BACKGROUND", (0, 0), (0, 0), PAPER),
                ("BOX", (0, 0), (0, 0), 0.6, LINE),
                ("LEFTPADDING", (0, 0), (0, 0), 4),
                ("RIGHTPADDING", (0, 0), (0, 0), 4),
                ("TOPPADDING", (0, 0), (0, 0), 3),
                ("BOTTOMPADDING", (0, 0), (0, 0), 3),
                ("LEFTPADDING", (1, 0), (1, 0), 6),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (1, 0), (1, 0), 0),
                ("BOTTOMPADDING", (1, 0), (1, 0), 0),
            ]
        ),
    )


def experience(period, role, institution, description):
    return KeepTogether(
        [
            p(period, entry_meta),
            p(f"{role} - {institution}", entry_title),
            p(description, small),
            Spacer(1, 2),
        ]
    )


def education(period, degree, institution, detail=""):
    elements = [
        p(period, entry_meta),
        p(degree, entry_title),
        p(institution, small),
    ]
    if detail:
        elements.append(p(detail, small))
    return KeepTogether(elements + [Spacer(1, 2)])


def publication_item(number, text, doi):
    return p(
        f"<b>{number}.</b> {text} "
        f'<link href="https://doi.org/{doi}" color="#087F83">doi:{doi}</link>',
        publication,
    )


def build_story():
    story = []
    contact_table = Table(
        [
            [
                p(
                    "<b>University of Jaén</b><br/>Department of Computer Science<br/>"
                    "Escuela Politécnica Superior de Linares",
                    contact,
                ),
                p(
                    '<link href="mailto:mmhurtad@ujaen.es" color="#087F83">'
                    "mmhurtad@ujaen.es</link><br/>"
                    '<link href="https://mendozamanu.github.io" color="#087F83">'
                    "mendozamanu.github.io</link>",
                    contact,
                ),
                p(
                    '<link href="https://orcid.org/0000-0003-1848-4595" color="#087F83">'
                    "ORCID 0000-0003-1848-4595</link><br/>"
                    "Linares, Spain",
                    contact,
                ),
            ]
        ],
        colWidths=[58 * mm, 64 * mm, 56 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        ),
    )
    story.extend([contact_table, Spacer(1, 7)])

    story.append(section_title("01", "Professional profile"))
    story.append(
        p(
            "Lecturer in the Department of Computer Science at the University of Jaén's "
            "Escuela Politécnica Superior de Linares and PhD graduate of the University "
            "of Córdoba. He defended his thesis, <i>Identification of population patterns "
            "using advanced machine learning techniques applied to mobile phone and "
            "geolocation data</i>, on 4 June 2026. The thesis was awarded "
            "<i>Sobresaliente cum laude</i> with International Mention. His research "
            "focuses on human mobility, geospatial machine learning, multi-label "
            "classification and digital trace data."
        )
    )

    story.append(section_title("02", "Professional experience"))
    story.extend(
        [
            experience(
                "September 2025 - present",
                "Temporary Lecturer (Profesor Sustituto)",
                "University of Jaén",
                "Teaching programming, databases, intelligent systems, mobile and "
                "distributed systems, and introductory computing across engineering "
                "degrees at the Escuela Politécnica Superior de Linares.",
            ),
            experience(
                "2025",
                "Laboratory Technical Staff",
                "University of Córdoba",
                "Three-month technical appointment supporting multi-label learning "
                "project PID2022-141869NB-I00.",
            ),
            experience(
                "2021 - 2025",
                "Predoctoral Researcher - FPU-UCO-2020",
                "University of Córdoba",
                "Research on population-pattern identification using mobile phone and "
                "geolocation data with advanced machine-learning methods.",
            ),
            experience(
                "March - August 2020",
                "RCT Development Intern",
                "Keysight Technologies",
                "Software development and testing with C#, Visual Studio and 5G technologies.",
            ),
            experience(
                "October 2018 - June 2019",
                "Undergraduate Research Fellow",
                "University of Córdoba",
                "Research training in Python, machine learning and classification.",
            ),
        ]
    )

    story.append(section_title("03", "Education"))
    story.extend(
        [
            education(
                "2021 - 2026",
                "PhD in Advanced Computing, Energy and Plasmas",
                "University of Córdoba",
                "Sobresaliente cum laude - International Mention.",
            ),
            education(
                "2020",
                "Master's Degree in Telematics and Telecommunication Networks",
                "University of Málaga",
            ),
            education(
                "2015 - 2019",
                "BSc in Computer Engineering - Software Engineering",
                "University of Córdoba",
            ),
        ]
    )

    story.append(PageBreak())
    story.append(section_title("04", "Scientific publications"))
    story.extend(
        [
            publication_item(
                1,
                "Mendoza-Hurtado, M.; Romero-del-Castillo, J. A.; Ortiz-Boyer, D. "
                "(2026). <b>MAPLID: a new multi-label approach for place "
                "identification using data supplied by mobile network operators.</b> "
                "<i>International Journal of Geographical Information Science</i>. "
                "Online first.",
                "10.1080/13658816.2026.2617932",
            ),
            publication_item(
                2,
                "García-Pedrajas, N. E.; Cuevas-Muñoz, J. M.; Mendoza-Hurtado, M.; "
                "Pérez-Rodríguez, J.; de Haro-García, A. (2026). <b>False flag: "
                "An evolutionary false labeling approach for multilabel "
                "classification.</b> <i>Applied Soft Computing</i>, 194, 114912.",
                "10.1016/j.asoc.2026.114912",
            ),
            publication_item(
                3,
                "Mendoza-Hurtado, M.; Järv, O.; Malekzadeh, M.; Karasov, O.; "
                "Ortiz-Boyer, D. (2026). <b>Sensing labour mobility flows of "
                "cross-border urban regions using machine learning and geolocated "
                "social network data.</b> <i>EPJ Data Science</i>, 15(1), 55.",
                "10.1140/epjds/s13688-026-00662-1",
            ),
            publication_item(
                4,
                "Mendoza-Hurtado, M.; Cerruela-García, G.; Ortiz-Boyer, D. (2025). "
                "<b>A supervised approach for land use identification in Trento "
                "using mobile phone data as an alternative to unsupervised clustering "
                "techniques.</b> <i>Applied Sciences</i>, 15(4), 1753.",
                "10.3390/app15041753",
            ),
            publication_item(
                5,
                "Mendoza-Hurtado, M.; Romero-del-Castillo, J. A.; Ortiz-Boyer, D. "
                "(2024). <b>SAMPLID: A new supervised approach for meaningful place "
                "identification using call detail records as an alternative to "
                "classical unsupervised clustering techniques.</b> "
                "<i>ISPRS International Journal of Geo-Information</i>, 13(8), 289.",
                "10.3390/ijgi13080289",
            ),
            publication_item(
                6,
                "Romero-del-Castillo, J. A.; Mendoza-Hurtado, M.; Ortiz-Boyer, D.; "
                "García-Pedrajas, N. (2022). <b>Local-based k values for multi-label "
                "k-nearest neighbors rule.</b> <i>Engineering Applications of "
                "Artificial Intelligence</i>, 116, 105487.",
                "10.1016/j.engappai.2022.105487",
            ),
        ]
    )

    story.append(section_title("05", "Conference contributions"))
    story.extend(
        [
            p(
                "<b>Dual-locality learning under neighbourhood coupling: interpretable "
                "and transferable models for structured trace data.</b> Fourth General "
                "Meeting, COSY COST Action CA21101, Spain, 2026.",
                small,
            ),
            p(
                "<b>Data acquisition of users' location with mobile devices.</b> "
                "11th Scientific Conference for Early-Career Researchers, "
                "University of Córdoba, 2023.",
                small,
            ),
        ]
    )

    story.append(section_title("06", "Projects and collaborations"))
    project_table = Table(
        [
            [
                p("2023 - 2026", entry_meta),
                p(
                    "<b>An integrated approach to semi-supervised multi-label learning "
                    "through evolutionary computation</b><br/>"
                    "Project PID2022-141869NB-I00 - University of Córdoba<br/>"
                    "Period: 1 September 2023 - 31 August 2026 - Funding: EUR 113,750",
                    small,
                ),
            ],
            [
                p("International research stay", entry_meta),
                p(
                    "<b>Digital Geography Lab - University of Helsinki</b><br/>"
                    "Research on cross-border labour mobility using geolocated social "
                    "media data.",
                    small,
                ),
            ],
        ],
        colWidths=[37 * mm, None],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, 0), 0.4, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        ),
    )
    story.append(project_table)

    story.append(section_title("07", "Research areas and skills"))
    skills = Table(
        [
            [
                p(
                    "<b>Research</b><br/>Human mobility and urban analytics<br/>"
                    "Geospatial machine learning",
                    small,
                ),
                p(
                    "<b>Methods</b><br/>Multi-label classification<br/>"
                    "Spatial validation and k-nearest neighbours",
                    small,
                ),
                p(
                    "<b>Technology</b><br/>Python and data science<br/>"
                    "Software development and databases",
                    small,
                ),
            ]
        ],
        colWidths=[59 * mm, 59 * mm, 60 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        ),
    )
    story.append(skills)
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = CVDocTemplate(str(OUTPUT))
    doc.build(build_story())
    print(f"Created {OUTPUT}")


if __name__ == "__main__":
    main()
