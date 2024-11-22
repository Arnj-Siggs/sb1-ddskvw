import axios from 'axios';
import { User, Role } from '../../types/auth';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Mock users for development
const MOCK_USERS: User[] = [
  {
    id: 'default-admin',
    email: 'admin@example.com',
    name: 'System Administrator',
    role: Role.SUPER_ADMIN,
  },
  {
    id: 'tech1',
    email: 'tech@example.com',
    name: 'Tech Support',
    role: Role.HELP_DESK,
  },
  {
    id: 'chromebook-admin',
    email: 'chromebook@example.com',
    name: 'Chromebook Manager',
    role: Role.CHROMEBOOK_ADMIN,
  },
];

// Default admin credentials check
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
  user: MOCK_USERS[0],
};

export async function localLogin(email: string, password: string): Promise<{ user: User; token: string }> {
  try {
    // Check for default admin credentials
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return {
        user: DEFAULT_ADMIN.user,
        token: 'default-admin-token',
      };
    }

    throw new Error('Invalid email or password');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
}

export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  role: string;
}): Promise<User> {
  try {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      role: userData.role as Role,
    };

    MOCK_USERS.push(newUser);
    return newUser;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error('Failed to create user. Please try again.');
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    return MOCK_USERS;
  } catch (error) {
    throw new Error('Failed to fetch users. Please try again.');
  }
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  try {
    const index = MOCK_USERS.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    // Don't allow updating the default admin's role
    if (id === 'default-admin' && userData.role && userData.role !== Role.SUPER_ADMIN) {
      throw new Error('Cannot change default admin role');
    }

    MOCK_USERS[index] = {
      ...MOCK_USERS[index],
      ...userData,
    };

    return MOCK_USERS[index];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error('Failed to update user. Please try again.');
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    // Don't allow deleting the default admin
    if (id === 'default-admin') {
      throw new Error('Cannot delete default admin user');
    }

    const index = MOCK_USERS.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    MOCK_USERS.splice(index, 1);
  } catch (error) {
    throw new Error('Failed to delete user. Please try again.');
  }
}