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
TEAL = colors.HexColor("#087F83")
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
        "Profesor de Informática - Doctor en Computación Avanzada, Energía y Plasmas",
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
        "CV académico público - Actualizado el 25 de julio de 2026",
    )
    canvas.drawRightString(
        PAGE_W - MARGIN_X,
        7 * mm,
        f"Pagina {doc.page}",
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
            title="Currículum vitae público - Manuel Mendoza Hurtado",
            author="Manuel Mendoza Hurtado",
            subject="Currículum académico público en español",
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
                    "<b>Universidad de Jaén</b><br/>Departamento de Informática<br/>"
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
                    "Jaén, España",
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

    story.append(section_title("01", "Perfil profesional"))
    story.append(
        p(
            "Profesor del Departamento de Informática de la Universidad de Jaén en la "
            "Escuela Politécnica Superior de Linares y doctor por la Universidad de "
            "Córdoba. Defendió el 4 de junio de 2026 la "
            "tesis <i>Identification of population patterns using advanced machine "
            "learning techniques applied to mobile phone and geolocation data</i>, "
            "calificada con Sobresaliente cum laude y Mención Internacional. Su "
            "investigación se centra en movilidad humana, aprendizaje automático "
            "geoespacial, clasificación multi-etiqueta y datos de trazas digitales."
        )
    )

    story.append(section_title("02", "Experiencia profesional"))
    story.extend(
        [
            experience(
                "Septiembre de 2025 - actualidad",
                "Profesor Sustituto",
                "Universidad de Jaén",
                "Docencia en programación, bases de datos, sistemas inteligentes, "
                "sistemas móviles y distribuidos e informática general en titulaciones "
                "de ingeniería de la Escuela Politécnica Superior de Linares.",
            ),
            experience(
                "2025",
                "Personal técnico de laboratorio",
                "Universidad de Córdoba",
                "Contrato técnico de tres meses vinculado al proyecto de aprendizaje "
                "multi-etiqueta PID2022-141869NB-I00.",
            ),
            experience(
                "2021 - 2025",
                "Investigador predoctoral FPU-UCO-2020",
                "Universidad de Córdoba",
                "Investigación sobre identificación de patrones poblacionales mediante "
                "datos de telefonía móvil, geolocalización y técnicas avanzadas de "
                "aprendizaje automático.",
            ),
            experience(
                "Marzo - agosto de 2020",
                "Becario de desarrollo RCT",
                "Keysight Technologies",
                "Desarrollo y pruebas de software con C#, Visual Studio y tecnologías 5G.",
            ),
            experience(
                "Octubre de 2018 - junio de 2019",
                "Beca de iniciación a la investigación",
                "Universidad de Córdoba",
                "Formación investigadora en Python, aprendizaje automático y clasificación.",
            ),
        ]
    )

    story.append(section_title("03", "Formación académica"))
    story.extend(
        [
            education(
                "2021 - 2026",
                "Doctorado en Computación Avanzada, Energía y Plasmas",
                "Universidad de Córdoba",
                "Sobresaliente cum laude - Mención Internacional.",
            ),
            education(
                "2020",
                "Máster Universitario en Telemática y Redes de Telecomunicación",
                "Universidad de Málaga",
            ),
            education(
                "2015 - 2019",
                "Grado en Ingeniería Informática - Ingeniería del Software",
                "Universidad de Córdoba",
            ),
        ]
    )

    story.append(PageBreak())
    story.append(section_title("04", "Publicaciones científicas"))
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

    story.append(section_title("05", "Comunicaciones científicas"))
    story.extend(
        [
            p(
                "<b>Dual-locality learning under neighbourhood coupling: interpretable "
                "and transferable models for structured trace data.</b> Fourth General "
                "Meeting, COSY COST Action CA21101, España, 2026.",
                small,
            ),
            p(
                "<b>Data acquisition of users' location with mobile devices.</b> "
                "XI Congreso Científico de Personal Investigador en Formación, "
                "Universidad de Córdoba, 2023.",
                small,
            ),
        ]
    )

    story.append(section_title("06", "Proyectos y colaboraciones"))
    project_table = Table(
        [
            [
                p("2023 - 2026", entry_meta),
                p(
                    "<b>Una aproximación integral al aprendizaje semi-supervisado "
                    "multi-etiqueta mediante computación evolutiva</b><br/>"
                    "Proyecto PID2022-141869NB-I00 - Universidad de Córdoba<br/>"
                    "Periodo: 01/09/2023 - 31/08/2026 - Financiación: 113.750 EUR",
                    small,
                ),
            ],
            [
                p("Estancia internacional", entry_meta),
                p(
                    "<b>Digital Geography Lab - University of Helsinki</b><br/>"
                    "Investigación sobre movilidad laboral transfronteriza a partir de "
                    "datos geolocalizados de redes sociales.",
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

    story.append(section_title("07", "Lineas y competencias"))
    skills = Table(
        [
            [
                p(
                    "<b>Investigación</b><br/>Movilidad humana y analítica urbana<br/>"
                    "Aprendizaje automático geoespacial",
                    small,
                ),
                p(
                    "<b>Métodos</b><br/>Clasificación multi-etiqueta<br/>"
                    "Validación espacial y k vecinos",
                    small,
                ),
                p(
                    "<b>Tecnología</b><br/>Python y ciencia de datos<br/>"
                    "Desarrollo de software y bases de datos",
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
