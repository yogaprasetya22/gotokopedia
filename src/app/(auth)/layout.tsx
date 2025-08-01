interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className=" flex items-center justify-center h-screen bg-slate-100">
            {children}
        </div>
    );
}
