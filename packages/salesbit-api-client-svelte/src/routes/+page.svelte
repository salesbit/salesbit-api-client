<script lang="ts">
	import { ProductProperties } from '$lib/index';

	const product = {
		id: 17,
		uid: '1-17',
		name: 'new-product-7',
		label: 'New Product 7',
		description: null,
		price: 100,
		sale_price: null,
		weight: null,
		volume: null,
		properties: [
			{
				id: 2,
				created_at: '2024-01-04T15:20:22.487Z',
				name: 'option-1',
				label: 'Option 1',
				description: 'description',
				type: 'select',
				size: 'lg',
				rate_id: null,
				option_id: 1,
				product_id: 17,
				project_id: 1,
				updated_at: null,
				option: {
					id: 1,
					created_at: '2024-01-04T12:42:53.186Z',
					name: 'option-1',
					label: 'Option 1',
					description: 'description',
					type: 'select',
					size: 'md',
					value_id: null,
					project_id: 1,
					updated_at: null
				},
				rates: [
					{
						id: 1,
						created_at: '2024-01-04T17:05:41.000Z',
						enabled: true,
						name: 'value-1',
						label: 'Value 1',
						description: null,
						price: 101,
						property_id: 2,
						value_id: 1,
						product_id: 17,
						project_id: 1,
						updated_at: null,
						value: {
							id: 1,
							created_at: '2024-01-04T12:42:53.186Z',
							name: 'value-1',
							label: 'Value 1',
							description: 'the description',
							type: '',
							value: 'value-1',
							option_id: 1,
							project_id: 1,
							updated_at: null
						}
					},
					{
						id: 2,
						created_at: '2024-01-05T08:18:33.000Z',
						enabled: true,
						name: 'value-2',
						label: 'Value 2',
						description: null,
						price: 102,
						property_id: 2,
						value_id: 2,
						product_id: 17,
						project_id: 1,
						updated_at: null,
						value: {
							id: 2,
							created_at: '2024-01-04T12:42:53.186Z',
							name: 'value-2',
							label: 'Value 2',
							description: 'the description',
							type: '',
							value: 'value-2',
							option_id: 1,
							project_id: 1,
							updated_at: null
						}
					}
				]
			},
			{
				id: 11,
				created_at: '2024-01-04T15:20:22.487Z',
				name: 'custom-property-1',
				label: 'Custom Property 1',
				description: null,
				type: 'radio',
				size: 'lg',
				rate_id: 9,
				option_id: null,
				product_id: 17,
				project_id: null,
				updated_at: null,
				option: null,
				rates: [
					{
						id: 8,
						created_at: '2024-01-04T15:57:33.242Z',
						enabled: true,
						name: '1',
						label: '1',
						description: null,
						price: null,
						property_id: 11,
						value_id: null,
						product_id: null,
						project_id: null,
						updated_at: null,
						value: null
					},
					{
						id: 9,
						created_at: '2024-01-04T15:57:33.242Z',
						enabled: true,
						name: '2',
						label: '2',
						description: null,
						price: null,
						property_id: 11,
						value_id: null,
						product_id: null,
						project_id: null,
						updated_at: null,
						value: null
					},
					{
						id: 10,
						created_at: '2024-01-04T15:57:33.242Z',
						enabled: true,
						name: '3',
						label: '3',
						description: null,
						price: null,
						property_id: 11,
						value_id: null,
						product_id: null,
						project_id: null,
						updated_at: null,
						value: null
					},
					{
						id: 11,
						created_at: '2024-01-04T15:57:33.242Z',
						enabled: true,
						name: '4',
						label: '4',
						description: null,
						price: null,
						property_id: 11,
						value_id: null,
						product_id: 11,
						project_id: null,
						updated_at: null,
						value: null
					},
					{
						id: 12,
						created_at: '2024-01-04T15:57:33.242Z',
						enabled: true,
						name: '5',
						label: '5',
						description: null,
						price: null,
						property_id: 11,
						value_id: null,
						product_id: 11,
						project_id: null,
						updated_at: null,
						value: null
					}
				]
			},
			{
				id: 12,
				created_at: '2024-01-04T15:20:22.487Z',
				name: 'option-2',
				label: 'Option 2',
				description: null,
				type: 'select',
				size: 'md',
				rate_id: null,
				option_id: 2,
				product_id: 17,
				project_id: null,
				updated_at: null,
				option: {
					id: 2,
					created_at: '2024-01-04T12:42:53.186Z',
					name: 'option-2',
					label: 'Option 2',
					description: 'description',
					type: 'radio',
					size: 'lg',
					value_id: null,
					project_id: 1,
					updated_at: null
				},
				rates: [
					{
						id: 13,
						created_at: '2024-01-04T15:57:33.242Z',
						enabled: true,
						name: 'value-11',
						label: 'Value 11',
						description: null,
						price: null,
						property_id: 12,
						value_id: 3,
						product_id: null,
						project_id: null,
						updated_at: null,
						value: {
							id: 3,
							created_at: '2024-01-04T12:42:53.186Z',
							name: 'value-11',
							label: 'Value 11',
							description: null,
							type: 'text',
							value: '111',
							option_id: 2,
							project_id: 1,
							updated_at: '2024-01-04T15:26:32.376Z'
						}
					},
					{
						id: 14,
						created_at: '2024-01-04T15:57:33.242Z',
						enabled: true,
						name: 'value-22',
						label: 'Value 22',
						description: null,
						price: null,
						property_id: 12,
						value_id: 4,
						product_id: null,
						project_id: null,
						updated_at: null,
						value: {
							id: 4,
							created_at: '2024-01-04T12:42:53.186Z',
							name: 'value-22',
							label: 'Value 22',
							description: null,
							type: 'text',
							value: 'value 22',
							option_id: 2,
							project_id: 1,
							updated_at: null
						}
					}
				]
			}
		],
		prices: [
			{
				id: 25,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 1,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:01.756Z',
				priceRates: [
					{
						priceId: 25,
						rateId: 1
					},
					{
						priceId: 25,
						rateId: 8
					},
					{
						priceId: 25,
						rateId: 13
					}
				]
			},
			{
				id: 26,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 2,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:02.007Z',
				priceRates: [
					{
						priceId: 26,
						rateId: 1
					},
					{
						priceId: 26,
						rateId: 8
					},
					{
						priceId: 26,
						rateId: 14
					}
				]
			},
			{
				id: 27,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 3,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:02.259Z',
				priceRates: [
					{
						priceId: 27,
						rateId: 1
					},
					{
						priceId: 27,
						rateId: 9
					},
					{
						priceId: 27,
						rateId: 13
					}
				]
			},
			{
				id: 28,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:02.509Z',
				priceRates: [
					{
						priceId: 28,
						rateId: 1
					},
					{
						priceId: 28,
						rateId: 9
					},
					{
						priceId: 28,
						rateId: 14
					}
				]
			},
			{
				id: 29,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:02.770Z',
				priceRates: [
					{
						priceId: 29,
						rateId: 1
					},
					{
						priceId: 29,
						rateId: 10
					},
					{
						priceId: 29,
						rateId: 13
					}
				]
			},
			{
				id: 30,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:03.025Z',
				priceRates: [
					{
						priceId: 30,
						rateId: 1
					},
					{
						priceId: 30,
						rateId: 10
					},
					{
						priceId: 30,
						rateId: 14
					}
				]
			},
			{
				id: 31,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:03.280Z',
				priceRates: [
					{
						priceId: 31,
						rateId: 1
					},
					{
						priceId: 31,
						rateId: 11
					},
					{
						priceId: 31,
						rateId: 13
					}
				]
			},
			{
				id: 32,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:03.537Z',
				priceRates: [
					{
						priceId: 32,
						rateId: 1
					},
					{
						priceId: 32,
						rateId: 11
					},
					{
						priceId: 32,
						rateId: 14
					}
				]
			},
			{
				id: 33,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:03.794Z',
				priceRates: [
					{
						priceId: 33,
						rateId: 1
					},
					{
						priceId: 33,
						rateId: 12
					},
					{
						priceId: 33,
						rateId: 13
					}
				]
			},
			{
				id: 34,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:04.104Z',
				priceRates: [
					{
						priceId: 34,
						rateId: 1
					},
					{
						priceId: 34,
						rateId: 12
					},
					{
						priceId: 34,
						rateId: 14
					}
				]
			},
			{
				id: 35,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:04.357Z',
				priceRates: [
					{
						priceId: 35,
						rateId: 2
					},
					{
						priceId: 35,
						rateId: 8
					},
					{
						priceId: 35,
						rateId: 13
					}
				]
			},
			{
				id: 36,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:04.611Z',
				priceRates: [
					{
						priceId: 36,
						rateId: 2
					},
					{
						priceId: 36,
						rateId: 8
					},
					{
						priceId: 36,
						rateId: 14
					}
				]
			},
			{
				id: 37,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:04.872Z',
				priceRates: [
					{
						priceId: 37,
						rateId: 2
					},
					{
						priceId: 37,
						rateId: 9
					},
					{
						priceId: 37,
						rateId: 13
					}
				]
			},
			{
				id: 38,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:05.129Z',
				priceRates: [
					{
						priceId: 38,
						rateId: 2
					},
					{
						priceId: 38,
						rateId: 9
					},
					{
						priceId: 38,
						rateId: 14
					}
				]
			},
			{
				id: 39,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:05.384Z',
				priceRates: [
					{
						priceId: 39,
						rateId: 2
					},
					{
						priceId: 39,
						rateId: 10
					},
					{
						priceId: 39,
						rateId: 13
					}
				]
			},
			{
				id: 40,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:05.636Z',
				priceRates: [
					{
						priceId: 40,
						rateId: 2
					},
					{
						priceId: 40,
						rateId: 10
					},
					{
						priceId: 40,
						rateId: 14
					}
				]
			},
			{
				id: 41,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:05.886Z',
				priceRates: [
					{
						priceId: 41,
						rateId: 2
					},
					{
						priceId: 41,
						rateId: 11
					},
					{
						priceId: 41,
						rateId: 13
					}
				]
			},
			{
				id: 42,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:06.138Z',
				priceRates: [
					{
						priceId: 42,
						rateId: 2
					},
					{
						priceId: 42,
						rateId: 11
					},
					{
						priceId: 42,
						rateId: 14
					}
				]
			},
			{
				id: 43,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:06.390Z',
				priceRates: [
					{
						priceId: 43,
						rateId: 2
					},
					{
						priceId: 43,
						rateId: 12
					},
					{
						priceId: 43,
						rateId: 13
					}
				]
			},
			{
				id: 44,
				created_at: '2024-01-04T15:57:33.242Z',
				price: 0,
				product_id: 17,
				project_id: null,
				updated_at: '2024-01-05T14:51:06.646Z',
				priceRates: [
					{
						priceId: 44,
						rateId: 2
					},
					{
						priceId: 44,
						rateId: 12
					},
					{
						priceId: 44,
						rateId: 14
					}
				]
			}
		],
		medias: [
			{
				public_url: 'https://files.salesbit.io/media/30-oak.png'
			},
			{
				public_url: 'https://files.salesbit.io/media/29-box.jpg'
			}
		]
	};
</script>

<div>
	<ProductProperties title="Properties" {product}></ProductProperties>
</div>
