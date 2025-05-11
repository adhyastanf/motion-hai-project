'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Loader2 } from 'lucide-react';

export const AlertModal = ({ isOpen, onClose, onConfirm, title, description, isLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title={title} description={description} isOpen={isOpen} onClose={onClose}>
      <div className='flex w-full items-center space-x-2 pt-6'>
        <Button className='flex-1' disabled={isLoading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        {isLoading && (
          <Button disabled className='flex-1'>
            <Loader2 className='animate-spin' />
            Please wait...
          </Button>
        )}
        {!isLoading && (
          <Button disabled={isLoading} className='flex-1' variant='destructive' onClick={onConfirm}>
            Delete
          </Button>
        )}
      </div>
    </Modal>
  );
};
