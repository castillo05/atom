import * as admin from 'firebase-admin';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class FirestoreUserRepository implements IUserRepository {
  private db: admin.firestore.Firestore;
  private collection: string;

  constructor() {
    this.db = admin.firestore();
    this.collection = 'users';
  }

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.db
      .collection(this.collection)
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate(),
      updatedAt: doc.data()?.updatedAt?.toDate(),
    } as User;
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = admin.firestore.Timestamp.now();
    const userRef = this.db.collection(this.collection).doc();

    const user: Omit<User, 'id'> = {
      ...userData,
      createdAt: now.toDate(),
      updatedAt: now.toDate(),
    };

    await userRef.set(user);

    return {
      id: userRef.id,
      ...user,
    };
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.db.collection(this.collection).doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate(),
      updatedAt: doc.data()?.updatedAt?.toDate(),
    } as User;
  }
}
