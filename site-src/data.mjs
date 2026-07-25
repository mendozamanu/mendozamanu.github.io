export const site = {
  baseUrl: "https://mendozamanu.github.io",
  name: "Manuel Mendoza Hurtado",
  shortName: "Manuel Mendoza",
  role: "Lecturer in Computer Science",
  degree: "PhD in Advanced Computing, Energy and Plasmas",
  headline:
    "Lecturer in Computer Science · PhD in Advanced Computing, Energy and Plasmas",
  focus:
    "Human Mobility · Geospatial Machine Learning · Multi-label Learning",
  description:
    "Manuel Mendoza Hurtado is a university lecturer and PhD-qualified researcher specialising in human mobility, geospatial machine learning and multi-label learning.",
  copyrightYear: 2026,
  assetVersion: "20260725-final-a11y",
  profileImage: "/assets/profile.png",
  email: "mmhurtad@ujaen.es",
  affiliation: {
    name: "University of Jaén",
    url: "https://www.ujaen.es/",
    profile:
      "https://www.ujaen.es/departamentos/dinformatica/contactos/mendoza-hurtado-manuel",
  },
  previousAffiliation: {
    name: "University of Córdoba",
    url: "https://www.uco.es/",
  },
  cv: "/files/manuel-mendoza-hurtado-cv.pdf",
  social: [
    {
      label: "ORCID",
      value: "0000-0003-1848-4595",
      url: "https://orcid.org/0000-0003-1848-4595",
    },
    {
      label: "Google Scholar",
      value: "Research profile",
      url: "https://scholar.google.com/citations?user=qrnovmMAAAAJ",
    },
    {
      label: "GitHub",
      value: "@mendozamanu",
      url: "https://github.com/mendozamanu",
    },
    {
      label: "LinkedIn",
      value: "Manuel Mendoza Hurtado",
      url: "https://www.linkedin.com/in/manuel-mendoza-hurtado-2b490611a/",
    },
    {
      label: "University profile",
      value: "Department of Computer Science",
      url: "https://www.ujaen.es/departamentos/dinformatica/contactos/mendoza-hurtado-manuel",
    },
  ],
  bio: [
    "I am a lecturer in Computer Science at the University of Jaén’s Escuela Politécnica Superior de Linares and a researcher working at the intersection of human mobility, geospatial data science and machine learning.",
    "I earned my PhD in Advanced Computing, Energy and Plasmas at the University of Córdoba. My thesis, “Identification of population patterns using advanced machine learning techniques applied to mobile phone and geolocation data,” was defended on 4 June 2026 and awarded Sobresaliente cum laude with International Mention.",
    "During an international research stay with the Digital Geography Lab at the University of Helsinki, I collaborated on methods for sensing cross-border labour mobility from geolocated social media. My current research studies mobility modelling, digital traces, spatial machine learning, multi-label classification and urban analytics.",
  ],
  interests: [
    "Human mobility and urban analytics",
    "Geospatial machine learning",
    "Multi-label learning",
    "Digital trace data",
  ],
  education: [
    {
      degree: "PhD in Advanced Computing, Energy and Plasmas",
      institution: "University of Córdoba",
      period: "2021–2026",
      detail: "Sobresaliente cum laude · International Mention",
      thesis:
        "Identification of population patterns using advanced machine learning techniques applied to mobile phone and geolocation data",
      url: "https://helvia.uco.es/handle/10396/36619",
    },
    {
      degree: "Master’s degree in Telematics and Telecommunication Networks",
      institution: "University of Málaga",
      period: "2020",
    },
    {
      degree: "BSc in Computer Engineering — Software Engineering",
      institution: "University of Córdoba",
      period: "2015–2019",
    },
  ],
  experience: [
    {
      role: "Temporary Lecturer (Profesor Sustituto)",
      institution: "University of Jaén",
      period: "September 2025–present",
      location: "Linares, Spain",
      detail:
        "Lecturer in the Department of Computer Science at the Escuela Politécnica Superior de Linares, teaching programming, databases, intelligent systems, mobile and distributed systems, and introductory computing across engineering degrees.",
      url: "https://www.ujaen.es/",
      logo: "/media/icons/brands/org-uja.png",
    },
    {
      role: "Laboratory Technical Staff",
      institution: "University of Córdoba",
      period: "2025",
      location: "Córdoba, Spain",
      detail:
        "Three-month technical appointment supporting the multi-label learning project PID2022-141869NB-I00.",
      url: "https://www.uco.es/",
      logo: "/media/icons/brands/org-uco.svg",
    },
    {
      role: "Predoctoral Researcher",
      institution: "University of Córdoba",
      period: "2021–2025",
      location: "Córdoba, Spain",
      detail:
        "Predoctoral fellowship FPU-UCO-2020 focused on population-pattern identification from mobile phone and geolocation data using advanced machine learning.",
      url: "https://cib.uco.es",
      logo: "/media/icons/brands/org-uco.svg",
    },
    {
      role: "RCT Development Intern",
      institution: "Keysight Technologies",
      period: "March–August 2020",
      location: "Málaga, Spain",
      detail:
        "Software development and testing with C#, Visual Studio and 5G technologies.",
      url: "https://www.keysight.com/",
      logo: "/media/icons/brands/org-ks.svg",
    },
    {
      role: "Research Scholarship",
      institution: "University of Córdoba",
      period: "October 2018–June 2019",
      location: "Córdoba, Spain",
      detail:
        "Research training in Python, machine learning and classification.",
      url: "https://www.uco.es/",
      logo: "/media/icons/brands/org-uco.svg",
    },
  ],
};

export const thesis = {
  slug: "thesis",
  title:
    "Identification of population patterns using advanced machine learning techniques applied to mobile phone and geolocation data",
  status: "Completed PhD Thesis",
  institution: "University of Córdoba",
  programme: "Advanced Computing, Energy and Plasmas",
  defenceDate: "4 June 2026",
  grade: "Sobresaliente cum laude",
  mention: "International Mention",
  supervisor: "Domingo Ortiz-Boyer",
  abstract:
    "The proliferation of mobile devices and telecommunications infrastructure offers unprecedented opportunities to understand population mobility at fine spatial and temporal scales. This thesis develops and evaluates supervised and multi-label machine-learning methods for identifying meaningful places and mobility patterns from call detail records and geolocated social media. Through a thesis by compendium, the research first benchmarks supervised place identification against classical unsupervised clustering, then extends the task to mixed-use urban areas through multi-label learning and spatially aware neighbourhood selection. Case studies in Milan and Trento test performance across contrasting urban forms, while cross-border regions demonstrate how models learned from digital traces can transfer between geographic contexts. The resulting methods combine interpretable features, spatial validation and computationally efficient classifiers to improve the identification of home, work, density, forest and commuting patterns. Together, the studies provide a reproducible framework for mobility modelling, urban analytics and evidence-based planning while recognising the privacy, representativeness and transferability constraints of digital trace data.",
  links: [
    {
      label: "Thesis record",
      url: "https://helvia.uco.es/handle/10396/36619",
    },
    {
      label: "Dialnet",
      url: "https://dialnet.unirioja.es/servlet/tesis?codigo=404070",
    },
    { label: "Publications", url: "/publication/" },
  ],
  corePublications: [
    "samplid",
    "trento",
    "maplid",
    "local-k",
    "ml-proxknn",
    "cross-border",
  ],
};

export const publications = [
  {
    slug: "maplid",
    title:
      "MAPLID: a new multi-label approach for place identification using data supplied by mobile network operators",
    authors: [
      "Manuel Mendoza-Hurtado",
      "Juan A. Romero-del-Castillo",
      "Domingo Ortiz-Boyer",
    ],
    date: "2026-01-29",
    year: 2026,
    venue: "International Journal of Geographical Information Science",
    publicationDetail: "Online first",
    type: "Journal Article",
    status: "Published",
    openAccess: true,
    featured: true,
    doi: "10.1080/13658816.2026.2617932",
    summary:
      "A supervised multi-label framework that identifies concurrent urban functions from mobile-network activity and generalises across Milan and Trento.",
    abstract:
      "Mobile phone data provide valuable insights into urban structure, yet traditional clustering methods assign a single label per location, oversimplifying mixed-use areas. MAPLID introduces a supervised multi-label framework for place identification using Call Detail Records from Telecom Italia. Several multi-label classifiers are evaluated using stratified cross-validation. Label Powerset with Random Forest achieves 88.3% average precision on Milan, and validation in Trento confirms the framework’s ability to operate in more irregular and forested terrain. The results show that multi-label learning can capture concurrent urban functions and provide a computationally efficient basis for dynamic land-use mapping, urban planning and mobility analysis.",
    tags: ["mobility", "multi-label", "classification", "place-identification", "land-use"],
    links: [
      {
        label: "Article",
        url: "https://www.tandfonline.com/doi/full/10.1080/13658816.2026.2617932",
      },
      {
        label: "PDF",
        url: "https://www.tandfonline.com/doi/pdf/10.1080/13658816.2026.2617932",
      },
      {
        label: "DOI",
        url: "https://doi.org/10.1080/13658816.2026.2617932",
      },
      {
        label: "Code & data",
        url: "https://doi.org/10.6084/m9.figshare.26130229",
      },
      {
        label: "UCO news",
        url: "https://www.uco.es/servicios/actualidad/ciencia/item/165499-llamadas-telefonos-moviles",
      },
    ],
    citation:
      "Mendoza-Hurtado, M., Romero-del-Castillo, J. A., & Ortiz-Boyer, D. (2026). MAPLID: a new multi-label approach for place identification using data supplied by mobile network operators. International Journal of Geographical Information Science. Online first. https://doi.org/10.1080/13658816.2026.2617932",
    bibtex: `@article{mendoza_hurtado_maplid_2026,
  author = {Mendoza-Hurtado, Manuel and Romero-del-Castillo, Juan A. and Ortiz-Boyer, Domingo},
  title = {MAPLID: a new multi-label approach for place identification using data supplied by mobile network operators},
  journal = {International Journal of Geographical Information Science},
  year = {2026},
  doi = {10.1080/13658816.2026.2617932}
}`,
  },
  {
    slug: "cross-border",
    title:
      "Sensing labour mobility flows of cross-border urban regions using machine learning and geolocated social network data",
    authors: [
      "Manuel Mendoza-Hurtado",
      "Olle Järv",
      "Milad Malekzadeh",
      "Oleksandr Karasov",
      "Domingo Ortiz-Boyer",
    ],
    date: "2026-05-13",
    year: 2026,
    venue: "EPJ Data Science",
    publicationDetail: "15(1), Article 55",
    type: "Journal Article",
    status: "Published",
    openAccess: true,
    featured: false,
    doi: "10.1140/epjds/s13688-026-00662-1",
    summary:
      "A transferable machine-learning framework for detecting cross-border commuting from geolocated social-media traces across three European regions.",
    abstract:
      "Cross-border commuting is central to economic integration but remains difficult to measure at fine spatial scales. This study introduces a fully data-driven machine-learning framework to detect and classify daily transnational commuters using geolocated social media data. Across the Greater Region of Luxembourg, the Basque Country and the Øresund Region, eighteen network and spatiotemporal features support models reaching up to 98% overall accuracy. Zero-shot transfer from Luxembourg to the other regions demonstrates the potential and limitations of using digital traces for scalable cross-border mobility analysis.",
    tags: ["mobility", "cross-border", "social-media", "classification"],
    links: [
      {
        label: "Article",
        url: "https://link.springer.com/article/10.1140/epjds/s13688-026-00662-1",
      },
      {
        label: "PDF",
        url: "https://link.springer.com/content/pdf/10.1140/epjds/s13688-026-00662-1.pdf",
      },
      {
        label: "DOI",
        url: "https://doi.org/10.1140/epjds/s13688-026-00662-1",
      },
      {
        label: "Code & data",
        url: "https://figshare.com/s/25a249abc430ea4ad8e",
      },
      {
        label: "Supplementary materials",
        url: "https://link.springer.com/article/10.1140/epjds/s13688-026-00662-1#Supplementary-information",
      },
    ],
    citation:
      "Mendoza-Hurtado, M., Järv, O., Malekzadeh, M., Karasov, O., & Ortiz-Boyer, D. (2026). Sensing labour mobility flows of cross-border urban regions using machine learning and geolocated social network data. EPJ Data Science, 15(1), Article 55. https://doi.org/10.1140/epjds/s13688-026-00662-1",
    bibtex: `@article{mendoza_hurtado_cross_border_2026,
  author = {Mendoza-Hurtado, Manuel and Järv, Olle and Malekzadeh, Milad and Karasov, Oleksandr and Ortiz-Boyer, Domingo},
  title = {Sensing labour mobility flows of cross-border urban regions using machine learning and geolocated social network data},
  journal = {EPJ Data Science},
  year = {2026},
  volume = {15},
  number = {1},
  pages = {55},
  doi = {10.1140/epjds/s13688-026-00662-1}
}`,
  },
  {
    slug: "false-flag",
    title:
      "False flag: An evolutionary false labeling approach for multilabel classification",
    authors: [
      "Nicolás E. García-Pedrajas",
      "José Manuel Cuevas-Muñoz",
      "Manuel Mendoza-Hurtado",
      "Javier Pérez-Rodríguez",
      "Aída de Haro-García",
    ],
    date: "2026-02-27",
    year: 2026,
    venue: "Applied Soft Computing",
    publicationDetail: "Volume 194, Article 114912",
    type: "Journal Article",
    status: "Published",
    openAccess: true,
    featured: false,
    doi: "10.1016/j.asoc.2026.114912",
    summary:
      "An evolutionary approach that deliberately modifies training labels to improve multi-label classification across diverse datasets and models.",
    abstract:
      "Multi-label classification becomes especially difficult for sparse, noisy labels and complex relationships among them. False flag labeling modifies the labels of training instances to construct a new training set that can improve model performance. An evolutionary algorithm treats this relabeling as an optimisation problem without assuming that added or removed labels correct annotation errors. Experiments across 50 datasets and seven classification models demonstrate the approach’s effectiveness.",
    tags: ["multi-label", "classification", "evolutionary", "ai"],
    links: [
      {
        label: "Article",
        url: "https://www.sciencedirect.com/science/article/pii/S1568494626003601",
      },
      {
        label: "DOI",
        url: "https://doi.org/10.1016/j.asoc.2026.114912",
      },
    ],
    citation:
      "García-Pedrajas, N. E., Cuevas-Muñoz, J. M., Mendoza-Hurtado, M., Pérez-Rodríguez, J., & de Haro-García, A. (2026). False flag: An evolutionary false labeling approach for multilabel classification. Applied Soft Computing, 194, Article 114912. https://doi.org/10.1016/j.asoc.2026.114912",
    bibtex: `@article{garcia_pedrajas_false_flag_2026,
  author = {García-Pedrajas, Nicolás E. and Cuevas-Muñoz, José Manuel and Mendoza-Hurtado, Manuel and Pérez-Rodríguez, Javier and de Haro-García, Aída},
  title = {False flag: An evolutionary false labeling approach for multilabel classification},
  journal = {Applied Soft Computing},
  year = {2026},
  volume = {194},
  pages = {114912},
  doi = {10.1016/j.asoc.2026.114912}
}`,
  },
  {
    slug: "trento",
    title:
      "A supervised approach for land use identification in Trento using mobile phone data as an alternative to unsupervised clustering techniques",
    authors: [
      "Manuel Mendoza-Hurtado",
      "Gonzalo Cerruela-García",
      "Domingo Ortiz-Boyer",
    ],
    date: "2025-02-09",
    year: 2025,
    venue: "Applied Sciences",
    publicationDetail: "15(4), Article 1753",
    type: "Journal Article",
    status: "Published",
    openAccess: true,
    featured: false,
    doi: "10.3390/app15041753",
    summary:
      "Supervised land-use classification from call detail records in an alpine setting, testing generalisation beyond dense metropolitan areas.",
    abstract:
      "This study explores land-use classification in Trento using supervised learning and call detail records as a proxy for human activity. The alpine setting introduces varied terrain and sparse network coverage. Comparative experiments with k-nearest neighbours, support vector machines and random forests show that supervised approaches can capture complex spatiotemporal patterns more accurately than unsupervised clustering. The results demonstrate the potential of mobile-network data for cost-effective, fine-grained land-use monitoring across urban, agricultural and forested areas.",
    tags: ["mobility", "classification", "land-use", "cdr"],
    links: [
      {
        label: "Article",
        url: "https://www.mdpi.com/2076-3417/15/4/1753",
      },
      {
        label: "PDF",
        url: "https://www.mdpi.com/2076-3417/15/4/1753/pdf",
      },
      { label: "DOI", url: "https://doi.org/10.3390/app15041753" },
    ],
    citation:
      "Mendoza-Hurtado, M., Cerruela-García, G., & Ortiz-Boyer, D. (2025). A supervised approach for land use identification in Trento using mobile phone data as an alternative to unsupervised clustering techniques. Applied Sciences, 15(4), Article 1753. https://doi.org/10.3390/app15041753",
    bibtex: `@article{mendoza_hurtado_trento_2025,
  author = {Mendoza-Hurtado, Manuel and Cerruela-García, Gonzalo and Ortiz-Boyer, Domingo},
  title = {A supervised approach for land use identification in Trento using mobile phone data as an alternative to unsupervised clustering techniques},
  journal = {Applied Sciences},
  year = {2025},
  volume = {15},
  number = {4},
  pages = {1753},
  doi = {10.3390/app15041753}
}`,
  },
  {
    slug: "samplid",
    title:
      "SAMPLID: A new supervised approach for meaningful place identification using call detail records as an alternative to classical unsupervised clustering techniques",
    authors: [
      "Manuel Mendoza-Hurtado",
      "Juan A. Romero-del-Castillo",
      "Domingo Ortiz-Boyer",
    ],
    date: "2024-08-20",
    year: 2024,
    venue: "ISPRS International Journal of Geo-Information",
    publicationDetail: "13(8), Article 289",
    type: "Journal Article",
    status: "Published",
    openAccess: true,
    featured: false,
    doi: "10.3390/ijgi13080289",
    summary:
      "A supervised alternative to classical clustering for identifying meaningful places from call detail records.",
    abstract:
      "SAMPLID introduces a supervised approach for meaningful place identification based on a problem-specific knowledge base. Using call detail records from Milan, the method outperforms classical unsupervised clustering and performs best when spatially related neighbouring cells are represented in the training data. The approach provides a direct path from mobile-network activity to interpretable home and work classifications and establishes the basis for later multi-label extensions.",
    tags: ["mobility", "classification", "place-identification", "cdr"],
    links: [
      {
        label: "Article",
        url: "https://www.mdpi.com/2220-9964/13/8/289",
      },
      {
        label: "PDF",
        url: "https://www.mdpi.com/2220-9964/13/8/289/pdf",
      },
      { label: "DOI", url: "https://doi.org/10.3390/ijgi13080289" },
    ],
    citation:
      "Mendoza-Hurtado, M., Romero-del-Castillo, J. A., & Ortiz-Boyer, D. (2024). SAMPLID: A new supervised approach for meaningful place identification using call detail records as an alternative to classical unsupervised clustering techniques. ISPRS International Journal of Geo-Information, 13(8), Article 289. https://doi.org/10.3390/ijgi13080289",
    bibtex: `@article{mendoza_hurtado_samplid_2024,
  author = {Mendoza-Hurtado, Manuel and Romero-del-Castillo, Juan A. and Ortiz-Boyer, Domingo},
  title = {SAMPLID: A new supervised approach for meaningful place identification using call detail records as an alternative to classical unsupervised clustering techniques},
  journal = {ISPRS International Journal of Geo-Information},
  year = {2024},
  volume = {13},
  number = {8},
  pages = {289},
  doi = {10.3390/ijgi13080289}
}`,
  },
  {
    slug: "local-k",
    title: "Local-based k values for multi-label k-nearest neighbors rule",
    authors: [
      "Juan A. Romero-del-Castillo",
      "Manuel Mendoza-Hurtado",
      "Domingo Ortiz-Boyer",
      "Nicolás García-Pedrajas",
    ],
    date: "2022-11-01",
    year: 2022,
    venue: "Engineering Applications of Artificial Intelligence",
    publicationDetail: "Volume 116, Article 105487",
    type: "Journal Article",
    status: "Published",
    openAccess: false,
    featured: false,
    doi: "10.1016/j.engappai.2022.105487",
    summary:
      "A locally adaptive method that selects a different neighbourhood size for each prototype in multi-label k-nearest-neighbour learning.",
    abstract:
      "Selecting a single global neighbourhood size is a major limitation of multi-label k-nearest-neighbour methods because different regions of the feature space contain different label distributions and decision boundaries. This work associates a potentially different k value with every prototype and optimises it from the local effect of neighbouring candidates. Experiments across 20 problems show significant improvements over standard and locally adaptive multi-label k-nearest-neighbour baselines while retaining comparable test-time complexity.",
    tags: ["multi-label", "classification", "knn"],
    links: [
      {
        label: "DOI",
        url: "https://doi.org/10.1016/j.engappai.2022.105487",
      },
    ],
    citation:
      "Romero-del-Castillo, J. A., Mendoza-Hurtado, M., Ortiz-Boyer, D., & García-Pedrajas, N. (2022). Local-based k values for multi-label k-nearest neighbors rule. Engineering Applications of Artificial Intelligence, 116, Article 105487. https://doi.org/10.1016/j.engappai.2022.105487",
    bibtex: `@article{romero_del_castillo_local_k_2022,
  author = {Romero-del-Castillo, Juan A. and Mendoza-Hurtado, Manuel and Ortiz-Boyer, Domingo and García-Pedrajas, Nicolás},
  title = {Local-based k values for multi-label k-nearest neighbors rule},
  journal = {Engineering Applications of Artificial Intelligence},
  year = {2022},
  volume = {116},
  pages = {105487},
  doi = {10.1016/j.engappai.2022.105487}
}`,
  },
  {
    slug: "ml-proxknn",
    title:
      "A new local proximity-based k-nearest neighbours method for multi-label population patterns identification using mobile phone data",
    authors: ["Manuel Mendoza-Hurtado"],
    authorNote:
      "The complete author list is omitted while the manuscript is under review.",
    date: "2026-01-01",
    year: 2026,
    venue: "Submitted manuscript",
    publicationDetail: "Under review",
    type: "Manuscript",
    status: "Manuscript under review",
    openAccess: false,
    featured: false,
    summary:
      "A spatially aware multi-label k-nearest-neighbour method that combines feature-space locality with grid adjacency.",
    abstract:
      "ML-proxkNN combines feature-space locality with Moore-neighbourhood relationships in the spatial grid to improve multi-label place identification from call detail records. Experiments on Milan and Trento compare eight multi-label classifiers under standard and spatial block cross-validation. The method achieves strong average precision and F1 scores while retaining its advantage when spatial autocorrelation is controlled, indicating that grid adjacency can improve locally adaptive neighbourhood selection across contrasting geographic contexts.",
    tags: ["mobility", "multi-label", "classification", "knn"],
    links: [],
    citation:
      "Mendoza-Hurtado, M. (2026). A new local proximity-based k-nearest neighbours method for multi-label population patterns identification using mobile phone data. Manuscript under review.",
  },
];

export const publicationBySlug = new Map(
  publications.map((publication) => [publication.slug, publication]),
);
