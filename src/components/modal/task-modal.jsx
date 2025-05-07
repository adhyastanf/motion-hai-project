'use client';

import TaskForm from '@/features/list-project/task-form';
import { Modal } from '../ui/modal';

export default function ModalTask({ title, description, open, onClose, onConfirm, isLoading, form, disabled, initialData }) {
  return (
    <Modal title={title} description={description} isOpen={open} onClose={onClose}>
      <TaskForm form={form} onConfirm={onConfirm} isLoading={isLoading} disabled={disabled} initialData={initialData} />
    </Modal>
  );
}
