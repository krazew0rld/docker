import { __ } from '@wordpress/i18n';
import { MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { Button, ButtonGroup } from '@wordpress/components';
import './editor.css';

export default function Edit({ attributes, setAttributes, isSelected }) {

	const { images } = attributes;

	const cls = [
		'mo-gallery'
	]

	const blockProps = useBlockProps({
		className: cls.filter(Boolean).join(' '),
	})

	return (
		<div {...blockProps}>
			{images.length > 0 && (
				<div className={cls.filter(Boolean).join(' ')}>
					{images.map((image) => (
						<figure className="mo-gallery__image">
							<img src={image.url} alt={image.alt} data-image-key={image.id} />
							{image.caption && <figcaption>{image.caption}</figcaption>}
						</figure>
					))}
				</div>
			)}
			<MediaUpload
				onSelect={(value) => setAttributes({ images: value })}
				value={images.map((image) => image.id)}
				allowedTypes={['image']}
				render={({ open }) => (
					(isSelected || !images.length) &&
					(
						images.length > 0 ? (
							<>
								<ButtonGroup>
									<Button variant="secondary" onClick={open}>
										{__('Modifier la galerie d\'images', 'cd50')}
									</Button>
									<Button variant="secondary" isDestructive onClick={() => setAttributes({ images: [] })}>
										{__('Supprimer la galerie d\'images', 'cd50')}
									</Button>
								</ButtonGroup>
							</>
						) : (
							<Button variant="secondary" onClick={open} style={{ width: 'fit-content' }}>
								{__('Créer une galerie d\'images', 'cd50')}
							</Button>
						)
					)
				)}
				gallery={true}
				multiple={true}
			/>
		</div>
	);
}
