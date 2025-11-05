export const getFirstSentence = (text: string): string => {
  if (!text) return '';
  const sentences = text.split('. ');
  return sentences.length > 0 ? sentences[0] + '.' : text;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getYear = (dateString: string): number => {
  return new Date(dateString).getFullYear();
};

