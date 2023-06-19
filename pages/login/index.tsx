import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { LoginForm } from '../../lib/type';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
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
    console.log('submit!', values);
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/',
    });

    console.log('sign in result: ', result);
    // fail --> {error: 'CredentialsSignin', status: 401, ok: false, url: null}
    // success --> {error: null, status: 200, ok: true, url: 'http://localhost:3000/'}

    await router.push('/');
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
            <Button className="btn btn-primary" type="submit">
              Login
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default Login;
