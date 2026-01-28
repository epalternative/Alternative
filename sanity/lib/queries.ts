export const postsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    titleEn,
    excerpt,
    excerptEn,
    metaTitle,
    metaTitleEn,
    metaDescription,
    metaDescriptionEn,
    heroImage,
    heroImageAlt,
    heroImageAltEn,
    publishedAt,
    _updatedAt,
    readingTimeMinutes,
    keywords,
    "category": category->{
      "category": slug,
      "categoryLabel": label,
      "categoryLabelEn": labelEn
    },
    "author": author->{
      name,
      nameEn,
      role,
      roleEn,
      image,
      bio,
      bioEn,
      certifications,
      link
    }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    titleEn,
    excerpt,
    excerptEn,
    metaTitle,
    metaTitleEn,
    metaDescription,
    metaDescriptionEn,
    heroImage,
    heroImageAlt,
    heroImageAltEn,
    publishedAt,
    _updatedAt,
    readingTimeMinutes,
    keywords,
    "category": category->{
      "category": slug,
      "categoryLabel": label,
      "categoryLabelEn": labelEn
    },
    "author": author->{
      name,
      nameEn,
      role,
      roleEn,
      image,
      bio,
      bioEn,
      certifications,
      link
    },
    body,
    bodyEn
  }
`;

export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)].slug.current
`;
