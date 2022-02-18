import React from 'react';
import CustomButton from '../../../components/Button';

const LoginPage: React.FC = () => {
  const handleSubmit = async (): Promise<any> => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="container mx-auto my-12">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center
        w-full md:w-6/12 bg-white py-12 px-6 md:px-20 rounded-xl
        shadow-sm"
        >
          <div className="w-6/12">
            <div className="form magnetic-form">
              <div className="my-8">
                <CustomButton
                  classes="text-lg font-bold my-2"
                  size="large"
                  block
                  onClick={handleSubmit}
                  buttonType="button"
                >
                  Sign In with Google
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
