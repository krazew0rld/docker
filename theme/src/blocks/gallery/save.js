import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { images } = attributes;

	const cls = [
		'mo-gallery'
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		<div {...blockProps}>
			{images.map((image) => (
				<figure className="mo-gallery__image">
					<button>
						<img src={image.url} alt={image.alt} data-image-key={image.id} />
					</button>
					{image.caption && <figcaption>{image.caption}</figcaption>}
				</figure>
			))}
		</div>
	);
}