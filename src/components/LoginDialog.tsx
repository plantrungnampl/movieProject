// components/LoginDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "@/app/(auth)/login/page"; // Điều chỉnh lại import nếu cần

type LoginDialogProps = {
  onClose: () => void;
};

const LoginDialog: React.FC<LoginDialogProps> = ({ onClose }) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
