export const validateSize = (size: number) => {
  if (!size) return;
  if (size > 10000000) {
    return false;
  } else {
    return true;
  }
};

const getExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
};

export const isImage = (filename: string) => {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
    case 'jpeg':
      return true;
  }
  return false;
};
