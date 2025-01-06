// Mock implementation of Firebase Firestore
export const getFirestore = jest.fn(() => ({}));

export const collection = jest.fn((db, path) => ({ 
  id: 'mockCollectionId', 
  path 
}));

export const doc = jest.fn((db, collectionPath, id) => ({ 
  id, 
  path: `${collectionPath}/${id}`,
  ref: { id, path: `${collectionPath}/${id}` } 
}));

export const addDoc = jest.fn().mockImplementation((collection, data) => 
  Promise.resolve({ id: 'mockDocId', ...data })
);

export const updateDoc = jest.fn().mockImplementation((docRef, data) => 
  Promise.resolve({ ...docRef, ...data })
);

export const getDoc = jest.fn().mockImplementation((docRef) => 
  Promise.resolve({
    exists: () => false,
    data: () => ({ friends: [] }),
    id: docRef.id,
    ref: docRef
  })
);

export const getDocs = jest.fn().mockImplementation(() => 
  Promise.resolve({
    empty: true,
    docs: []
  })
);

export const onSnapshot = jest.fn().mockImplementation((query, callback) => {
  callback({
    exists: () => true,
    data: () => ({ friends: ['existingFriend@example.com'] })
  });
  return () => {};
});

export const query = jest.fn((collection, ...constraints) => ({
  collection,
  constraints
}));

export const where = jest.fn((field, op, value) => ({
  field,
  op,
  value
}));

export const arrayUnion = jest.fn((...args) => ({
  type: 'arrayUnion',
  values: args
}));

export const setDoc = jest.fn().mockImplementation((docRef, data) => 
  Promise.resolve({ ...docRef, ...data })
);