// // databaseFunctions.js
// import { database, ID } from "./appwrite";

// export const createNewDocument = async (data) => {
//   try {
//     const response = await database.createDocument(
//       "6803d08a003b2f8e6e2a",   // Database ID
//       "6803e95900368fd960a2",   // Collection ID
//       ID.unique(),
//       data
//     );
//     return response;
//   } catch (error) {
//     console.error("Create Document Error:", error);
//     throw error;
//   }
// };

// export const getAllDocuments = async () => {
//   try {
//     const response = await database.listDocuments(
//       "6803d08a003b2f8e6e2a",   // Database ID
//       "6803e95900368fd960a2"
//     );
//     return response.documents;
//   } catch (error) {
//     console.error("List Documents Error:", error);
//     throw error;
//   }
// };

// export const updateDocumentById = async (documentId, updatedData) => {
//   try {
//     const response = await database.updateDocument(
//       "6803d08a003b2f8e6e2a",
//       "6803e95900368fd960a2",
//       documentId,
//       updatedData
//     );
//     return response;
//   } catch (error) {
//     console.error("Update Document Error:", error);
//     throw error;
//   }
// };

// export const deleteDocumentById = async (documentId) => {
//   try {
//     await database.deleteDocument(
//       "6803d08a003b2f8e6e2a",
//       "6803e95900368fd960a2",
//       documentId
//     );
//   } catch (error) {
//     console.error("Delete Document Error:", error);
//     throw error;
//   }
// };
