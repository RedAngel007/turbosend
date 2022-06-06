import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Link,
  Checkbox,
  Heading,
} from '@chakra-ui/react';
import { CustomInput } from '../../Components/Form/CustomInput';
import { Link as RLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useToast } from '../../Hooks/useToast';
import { initialValues, validationSchema } from './utils';
import { useEffect } from 'react';
import { AppRoutes } from '../../Routes/AppRoutes';
import { useLogin } from '../../Hooks/useLogin';

export const Login = () => {
  const { alert } = useToast();
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    isSuccess: isLoginSuccess,
    data,
  } = useLogin();

  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      login(values);
    },
  });

  useEffect(() => {
    if (isLoginSuccess) {
      alert('success', 'Login was successful');

      setTimeout(() => {
        navigate(AppRoutes.home);
      }, 500);
    }
  }, [isLoginSuccess]);

  return (
    <Flex
      alignItems="center"
      h="full"
      justifyContent="center"
      bg="white"
      flex={1}
      p={['5', '10']}
    >
      <Box
        shadow="lg"
        p="5"
        px="10"
        pb="10"
        borderRadius="md"
        boxShadow="0px 0px 90px rgba(0, 0, 0, 0.1)"
        w={['100%', '450px']}
      >
        <Heading alignSelf="flex-start" fontSize="xl" mb="4">
          Sign in
        </Heading>
        <Text fontSize="sm" mb="10">
          Welcome, enter your credentials
        </Text>
        <VStack spacing={3} mb="7" alignItems="flex-start">
          <CustomInput
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username or email"
            error={errors.username}
          />
          <CustomInput
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            error={errors.password}
          />
          <Flex w="100%" justifyContent="space-between">
            <Checkbox>
              <Text fontSize="xs">Remember me</Text>
            </Checkbox>
            <Link as={RLink} to={AppRoutes.resetPassword} ml="1" fontSize="sm">
              Forget password?
            </Link>
          </Flex>
        </VStack>
        <Button
          isLoading={isLoading}
          variant="solid"
          colorScheme="linkedin"
          w="full"
          mb="7"
          onClick={() => handleSubmit()}
        >
          Login
        </Button>
        <Flex mb="2" alignItems="center">
          <Text fontSize="xs">Don&apos;t have an account? </Text>
          <Link
            as={RLink}
            to={AppRoutes.register}
            ml="1"
            fontSize="sm"
            color="darkCoral"
          >
            Sign up
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};
