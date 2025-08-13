import React from 'react';
import { Overlay } from '../components//Overlay';
import { ModalContainer } from '../components//ModalContainer';
import { CloseButton } from '../components//CloseButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Fechar modal">
          &times;
        </CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
}
