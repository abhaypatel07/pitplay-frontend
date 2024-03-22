import LoginBtn from "../../ui/loginBtn/loginBtn";


const ProtectedPage = ({ children }: any) => {
  const isLoading = false;
  const user = true
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
          />
          <p className="ml-2">Loding...</p>
        </div>
      ) : user ? (
        <div>{children}</div>
      ) : (
        <LoginBtn />
      )}
    </div>
  );
};

export default ProtectedPage;
