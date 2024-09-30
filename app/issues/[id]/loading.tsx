import { Card, Flex, Heading, Skeleton, Text } from '@radix-ui/themes';

const LoadingIssueDetailPage = () => {
	return (
		<Flex direction='column' gap='2' className='max-w-xl'>
			<Skeleton>
				<Heading>Lorem ipsum dolor sit amet.</Heading>
			</Skeleton>
			<Flex gap='2' align='center' wrap='wrap'>
				<Skeleton>
					<Text>In Progress</Text>
				</Skeleton>
				<Skeleton>
					<Text>Mon Sep 09 2024 </Text>
				</Skeleton>
			</Flex>
			<Card>
				<Text>
					<Skeleton>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Inventore hic quos nulla harum voluptates? Consequatur
						ipsum veritatis quo. Ad, quisquam maiores libero vel
						consequuntur, tenetur tempora, odio blanditiis
						laudantium perferendis et dolor iure amet autem sint
						nesciunt rem accusamus facilis dicta deleniti possimus
						sunt. Debitis explicabo voluptate id quibusdam quod.
					</Skeleton>
				</Text>
			</Card>
		</Flex>
	);
};

export default LoadingIssueDetailPage;
