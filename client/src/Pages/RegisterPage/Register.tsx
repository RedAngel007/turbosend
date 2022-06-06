import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Link,
  Heading,
} from '@chakra-ui/react';
import { CustomInput } from '../../Components/Form/CustomInput';
import { Link as RLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useToast } from '../../Hooks/useToast';
import { initialValues, validationSchema } from './utils';
import { useEffect } from 'react';
import { useRegister } from '../../Hooks/useRegister';
import { AppRoutes } from '../../Routes/AppRoutes';

export const Register = () => {
  const { alert } = useToast();
  const navigate = useNavigate();

  const {
    mutate: register,
    isLoading,
    isSuccess: isRegisterSuccess,
    data,
  } = useRegister();

  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      register(values);
    },
  });

  useEffect(() => {
    if (isRegisterSuccess) {
      alert('success', 'Registration was successful');

      setTimeout(() => {
        navigate(AppRoutes.home);
      }, 500);
    }
  }, [isRegisterSuccess]);

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
          Register
        </Heading>
        <Text fontSize="sm" mb="10">
          Welcome, please register
        </Text>
        <VStack spacing={3} mb="7" alignItems="flex-start">
          <CustomInput
            onChange={handleChange}
            name="firstName"
            type="text"
            placeholder="firstName"
            error={errors.firstName}
            label="First Name"
          />
          <CustomInput
            onChange={handleChange}
            name="lastName"
            type="text"
            placeholder="Last Name"
            error={errors.lastName}
            label="Last Name"
          />
          <CustomInput
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email"
            error={errors.email}
            label="Email"
          />
          <CustomInput
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            error={errors.password}
            label="Password"
          />
          <CustomInput
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            placeholder="Confrim Password"
            error={errors.password}
            label="Confirm Password"
          />
        </VStack>
        <Button
          isLoading={isLoading}
          variant="solid"
          colorScheme="linkedin"
          w="full"
          mb="7"
          onClick={() => handleSubmit()}
        >
          Register
        </Button>
        <Flex mb="2" alignItems="center">
          <Text fontSize="xs">You have an account? </Text>
          <Link
            as={RLink}
            to={AppRoutes.login}
            ml="1"
            fontSize="sm"
            color="darkCoral"
          >
            Login
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};
