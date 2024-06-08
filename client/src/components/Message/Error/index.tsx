function ErrorMessage({ error }: { error: string }) {
  return <p className="text-red-600 text-xs text-left">{error}</p>;
}

export default ErrorMessage;
