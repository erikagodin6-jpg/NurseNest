export function buildBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function buildFaqStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function buildFaqFromQuizQuestions(questions: { question: string; options: string[]; correct: number; rationale: string }[]) {
  const faqs = questions.slice(0, 10).map((q) => ({
    question: q.question,
    answer: `${q.options[q.correct]}. ${q.rationale}`,
  }));
  return buildFaqStructuredData(faqs);
}

export function buildCatalogStructuredData(lessons: { id: string; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nursing Pathophysiology Lessons",
    "description": "Comprehensive catalog of nursing pathophysiology lessons covering cardiovascular, respiratory, neurological, GI, renal, endocrine, hematology, pediatrics, maternity, neonatal, and more.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
    },
    "hasPart": lessons.slice(0, 50).map((l) => ({
      "@type": "LearningResource",
      "name": l.name,
      "url": `https://www.nursenest.ca/lessons/${l.id}`,
    })),
  };
}

export function buildCourseStructuredData(course: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  offers?: { price: string; priceCurrency: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "url": course.url,
    "provider": {
      "@type": "EducationalOrganization",
      "name": course.provider || "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "courseMode": "online",
    "isAccessibleForFree": false,
    ...(course.offers
      ? {
          "offers": {
            "@type": "Offer",
            "price": course.offers.price,
            "priceCurrency": course.offers.priceCurrency,
            "availability": "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function buildAggregateRatingStructuredData(rating: {
  ratingValue: string;
  reviewCount: string;
  bestRating?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "NurseNest",
    "url": "https://www.nursenest.ca",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.ratingValue,
      "reviewCount": rating.reviewCount,
      "bestRating": rating.bestRating || "5",
    },
  };
}

export function buildJobPostingStructuredData(job: {
  title: string;
  description: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency?: string;
  educationRequirements?: string;
  occupationalCategory?: string;
  employmentType?: string;
  jobLocationType?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "NurseNest",
      "sameAs": "https://www.nursenest.ca",
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": job.salaryCurrency || "USD",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.salaryMin,
        "maxValue": job.salaryMax,
        "unitText": "YEAR",
      },
    },
    "employmentType": job.employmentType || "FULL_TIME",
    "jobLocationType": job.jobLocationType || "TELECOMMUTE",
    ...(job.educationRequirements
      ? { "educationRequirements": { "@type": "EducationalOccupationalCredential", "credentialCategory": job.educationRequirements } }
      : {}),
    ...(job.occupationalCategory ? { "occupationalCategory": job.occupationalCategory } : {}),
    ...(job.url ? { "url": job.url } : {}),
    "datePosted": new Date().toISOString().split("T")[0],
    "validThrough": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  };
}

export function buildEducationalOrganizationStructuredData(org?: {
  name?: string;
  url?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": org?.name || "NurseNest",
    "url": org?.url || "https://www.nursenest.ca",
    "description": org?.description || "Comprehensive nursing and allied health exam preparation platform with practice questions, clinical simulations, and pathophysiology lessons.",
    "educationalCredentialAwarded": "Nursing Exam Preparation",
    "sameAs": [
      "https://www.nursenest.ca",
      "https://allied.nursenest.ca",
    ],
  };
}

export function buildReviewStructuredData(reviews: {
  author: string;
  reviewBody: string;
  ratingValue: string;
  datePublished?: string;
}[]) {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
    },
    "author": {
      "@type": "Person",
      "name": review.author,
    },
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.ratingValue,
      "bestRating": "5",
    },
    ...(review.datePublished ? { "datePublished": review.datePublished } : {}),
  }));
}
