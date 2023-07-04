// TODO: Add response validation
export async function deleteCollectionItem({
  collectionName,
  elementId,
}: {
  collectionName: string
  elementId: string
}) {
  const res = await fetch(`/cms/content?id=${collectionName}&elementId=${elementId}`, {
    method: 'DELETE',
  })
  return res.json()
}
