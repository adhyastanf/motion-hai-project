'use client';

import ProjectForm from '@/features/list-task/project-form';
import { Modal } from '../ui/modal';

export default function ModalProject({ title, description, open, onClose, onConfirm, isLoading, form, disabled, buttonYesText, fields }) {
  return (
    <Modal title={title} description={description} isOpen={open} onClose={onClose}>
      <div className='max-h-[80vh] overflow-y-auto pr-2'>
        <ProjectForm form={form} onConfirm={onConfirm} isLoading={isLoading} disabled={disabled} fields={fields} buttonYesText={buttonYesText} />
      </div>
    </Modal>
  );
}
