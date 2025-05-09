import * as admin from 'firebase-admin';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';

export class FirestoreTaskRepository implements ITaskRepository {
  private db: admin.firestore.Firestore;
  private collection: string;

  constructor() {
    this.db = admin.firestore();
    this.collection = 'tasks';
  }

  async findAll(userId: string): Promise<Task[]> {
    const snapshot = await this.db
      .collection(this.collection)
      .where('userId', '==', userId)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate(),
      updatedAt: doc.data()?.updatedAt?.toDate(),
    })) as Task[];
  }

  async findById(id: string): Promise<Task | null> {
    const doc = await this.db.collection(this.collection).doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate(),
      updatedAt: doc.data()?.updatedAt?.toDate(),
    } as Task;
  }

  async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const now = admin.firestore.Timestamp.now();
    const taskRef = this.db.collection(this.collection).doc();

    const task: Omit<Task, 'id'> = {
      ...taskData,
      createdAt: now.toDate(),
      updatedAt: now.toDate(),
    };

    await taskRef.set(task);

    return {
      id: taskRef.id,
      ...task,
    };
  }

  async update(id: string, taskData: Partial<Task>): Promise<Task> {
    const now = admin.firestore.Timestamp.now();
    const taskRef = this.db.collection(this.collection).doc(id);

    const updateData = {
      ...taskData,
      updatedAt: now.toDate(),
    };

    await taskRef.update(updateData);

    const updatedDoc = await taskRef.get();
    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      createdAt: updatedDoc.data()?.createdAt?.toDate(),
      updatedAt: updatedDoc.data()?.updatedAt?.toDate(),
    } as Task;
  }

  async delete(id: string): Promise<void> {
    await this.db.collection(this.collection).doc(id).delete();
  }
}
