import { Void, Text } from '@/components/Themed';
import { productSearchParamsSchema } from '@/constants/Schema';
import { Redirect, useLocalSearchParams,  } from 'expo-router';


export default function Page() {
  const result = productSearchParamsSchema.safeParse(useLocalSearchParams());
  if (!result.success)  return <Redirect href="/"/>

  const { id } = result.data;

  return <Void save>
    <Text>Blog post: {id}</Text>
  </Void>;
}