// Has this banner for all /signin routes

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border-b p-1 text-center">
        20% off for the next 3 days
      </div>
      {children}
    </div>
  );
}
