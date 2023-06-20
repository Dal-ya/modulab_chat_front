import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { SignUpForm } from '../../lib/type';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const signup = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const router = useRouter();
  const form = useForm<SignUpForm & { checkPassword: string }>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      secret: '',
    },

    validate: {
      name: (value) => (value.length > 0 ? null : '필수값입니다'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : '이메일 형식으로 입력하세요'),
      password: (value) => (value.length > 0 ? null : '필수값입니다'),
      checkPassword: (value) => (value.length > 0 ? null : '필수값입니다'),
      secret: (value) => (value.length > 0 ? null : '필수값입니다'),
    },
  });

  const onSubmit = async (values: SignUpForm & { checkPassword: string }) => {
    try {
      setIsLoginLoading(true);

      if (values.checkPassword !== values.password) {
        alert('비밀번호를 다시 확인해 주세요!');
        return;
      }

      const response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
        data: { ...values },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      await Swal.fire({
        text: '유저 생성에 성공하였습니다. 로그인 해주세요',
        confirmButtonText: '확인',
      });

      await router.push('/login');
    } catch (err) {
      console.log(err);
      alert('다시 시도해 주세요, ' + err);
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <div className="text-center mb-10">
        <h1 className="font-bold">SIGN-UP</h1>
      </div>
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="이름을 입력하세요"
            {...form.getInputProps('name')}
          />

          <TextInput
            className="mt-2"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            className="mt-2"
            withAsterisk
            placeholder="비밀번호를 입력하세요"
            label="Password"
            {...form.getInputProps('password')}
          />

          <PasswordInput
            className="mt-2"
            withAsterisk
            placeholder="비밀번호를 입력하세요"
            label="Check Password"
            {...form.getInputProps('checkPassword')}
          />

          <PasswordInput
            className="mt-2"
            withAsterisk
            label="Secret"
            placeholder="유저 생성용 비밀키를 입력하세요"
            {...form.getInputProps('secret')}
          />

          <Group position="center" mt="md">
            <Button className="btn btn-primary" type="submit" disabled={isLoginLoading}>
              Sign Up
            </Button>
          </Group>
        </form>
      </Box>

      <div className="mt-16">
        <button
          className="btn btn-outline btn-info btn-sm mr-2"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default signup;
