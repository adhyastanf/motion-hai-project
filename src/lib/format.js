export function generateSlug(name) {
    const baseSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `${baseSlug}-${randomSuffix}`;
  }