export async function fileToBuffer(file: File): Promise<Buffer> {
  return Buffer.from(await file.arrayBuffer());
}

export async function fileArrayToBufferArray(files: File[]): Promise<Buffer[]> {
  return Promise.all(files.map(async (file) => {
    return await fileToBuffer(file);
  }));
}



