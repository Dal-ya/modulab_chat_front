import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { LoginForm } from '../../lib/type';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : '이메일 형식으로 입력하세요'),
      password: (value) => (value.length > 0 ? null : '필수값입니다'),
    },
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      setIsLoginLoading(true);

      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: '/',
      });

      // result
      // fail --> {error: 'CredentialsSignin', status: 401, ok: false, url: null}
      // success --> {error: null, status: 200, ok: true, url: 'http://localhost:3000/'}

      if (result?.error) {
        window.alert('로그인 실패. 다시 시도해 주세요.');
        setIsLoginLoading(false);
        return;
      }

      await router.push('/');
    } catch (err) {
      console.log(err);
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <div className="text-center mb-10">
        <h1 className="font-bold">LOGIN</h1>
      </div>
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            placeholder="Password"
            label="Password"
            {...form.getInputProps('password')}
          />

          <Group position="center" mt="md">
            <Button className="btn btn-primary" type="submit" disabled={isLoginLoading}>
              Login
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default Login;
