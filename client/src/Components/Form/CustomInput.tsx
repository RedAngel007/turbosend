import React from 'react';
import { Icon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

type CustomInputPropType = {
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  label?: string;
  value?: string;
};

export const CustomInput = ({
  error,
  onChange,
  type,
  label,
  name,
  placeholder,
  value,
}: CustomInputPropType) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const _handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <Input
          onChange={onChange}
          borderColor="grey"
          borderRadius={5}
          placeholder={placeholder}
          name={name}
          fontSize="sm"
          value={value}
          _placeholder={{
            color: 'placeholderText',
            fontSize: 'sm',
          }}
          type={isPasswordVisible ? 'text' : type}
        />
        {type === 'password' && (
          <InputRightElement
            onClick={_handleTogglePasswordVisibility}
            cursor="pointer"
            // eslint-disable-next-line react/no-children-prop
          />
        )}
      </InputGroup>

      {!error && <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>}
    </FormControl>
  );
};
