import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBilling } from 'apiSdk/billings';
import { billingValidationSchema } from 'validationSchema/billings';
import { UserInterface } from 'interfaces/user';
import { PurchaseInterface } from 'interfaces/purchase';
import { getUsers } from 'apiSdk/users';
import { getPurchases } from 'apiSdk/purchases';
import { BillingInterface } from 'interfaces/billing';

function BillingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BillingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBilling(values);
      resetForm();
      router.push('/billings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BillingInterface>({
    initialValues: {
      amount_due: 0,
      due_date: new Date(new Date().toDateString()),
      payment_date: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
      purchase_id: (router.query.purchase_id as string) ?? null,
    },
    validationSchema: billingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Billings',
              link: '/billings',
            },
            {
              label: 'Create Billing',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Billing
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Amount Due"
            formControlProps={{
              id: 'amount_due',
              isInvalid: !!formik.errors?.amount_due,
            }}
            name="amount_due"
            error={formik.errors?.amount_due}
            value={formik.values?.amount_due}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('amount_due', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="due_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Due Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.due_date ? new Date(formik.values?.due_date) : null}
              onChange={(value: Date) => formik.setFieldValue('due_date', value)}
            />
          </FormControl>
          <FormControl id="payment_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Payment Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.payment_date ? new Date(formik.values?.payment_date) : null}
              onChange={(value: Date) => formik.setFieldValue('payment_date', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<PurchaseInterface>
            formik={formik}
            name={'purchase_id'}
            label={'Select Purchase'}
            placeholder={'Select Purchase'}
            fetcher={getPurchases}
            labelField={'quantity'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/billings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'billing',
    operation: AccessOperationEnum.CREATE,
  }),
)(BillingCreatePage);