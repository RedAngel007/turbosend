import { useToast as useToaster } from '@chakra-ui/react';

type Status = 'info' | 'warning' | 'success' | 'error'

export const useToast = () => {

	const toast = useToaster();

	const alert = (status: Status, message?: string) => {
		return toast({
			title: message,
			status: status,
			isClosable: true,
			duration: 2000,
			position: 'top-right',
		});
	};

	return {alert};
};