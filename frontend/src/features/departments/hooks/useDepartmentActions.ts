import { use, useState } from 'react';
import type { CreateDepartmentPayload, Department, UpdateDepartmentPayload } from '../types/departments.types';
import { createDepartment, deleteDepartment, getDepartment, updateDepartment } from '../services/departments.service';
import { useConfirm } from '@/hooks/useConfirm';

export function useDepartmentActions() {
  const [loading, setLoading] = useState(false);
  const confirm = useConfirm();

  const findDepartment = async (id: string) => {
    setLoading(true);
    try {
      const res = await getDepartment(id);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload: CreateDepartmentPayload) => {
    setLoading(true);
    try {
      const res = await createDepartment(payload);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const update = async (
    id: string,
    payload: UpdateDepartmentPayload,
  ) => {
    setLoading(true);
    try {
      const res = await  updateDepartment(id, payload);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const destroy = async (id: string) => {
    setLoading(true);
    try {
      await deleteDepartment(id);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async (department: Department) => {
    const ok = await confirm({
      title: 'Delete department',
      description: `Are you sure you want to delete "${department.title}"? This action cannot be undone.`,
      confirmText: 'Delete',
      destructive: true,
    })

    if (!ok) return

    await destroy(department._id)
  }

  return {
    loading,
    findDepartment,
    create,
    update,
    destroy,
    confirmDelete,
  };
}

