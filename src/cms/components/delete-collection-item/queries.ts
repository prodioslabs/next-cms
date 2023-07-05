// TODO: Add response validation
export async function deleteCollectionItem({ elementId }: { elementId: string }) {
  const res = await fetch(`/cms/content?elementId=${elementId}&type=collection`, {
    method: 'DELETE',
  })
  return res.json()
}
