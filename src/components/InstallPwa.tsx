"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function InstallPwa() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
      // Check if we've already prompted the user
      const hasBeenPrompted = localStorage.getItem('pwaInstallPrompted');
      if (!hasBeenPrompted) {
        setIsOpen(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    // We've prompted the user, don't do it again
    localStorage.setItem('pwaInstallPrompted', 'true');
    setIsOpen(false);
    
    // Clear the prompt
    setInstallPrompt(null);
  }, [installPrompt]);
  
  const handleCancel = () => {
    // We've prompted the user, don't do it again
    localStorage.setItem('pwaInstallPrompted', 'true');
    setIsOpen(false);
  }

  if (!installPrompt || !isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Install App</AlertDialogTitle>
          <AlertDialogDescription>
            For a better experience, install the Baobab Golf app on your device. It's fast, works offline, and feels like a native app.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleInstall}>Install</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}