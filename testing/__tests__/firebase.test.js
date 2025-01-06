import { addDoc, getDoc } from 'firebase';

describe('Firebase Mock Tests', () => {
  it('should add a document to a collection', async () => {
    const mockData = { name: 'Test Item' };
    const docRef = await addDoc('mockCollection', mockData);
    expect(docRef.id).toBe('mockDocId');
    expect(addDoc).toHaveBeenCalledWith('mockCollection', mockData);
  });
});
