import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { file, size, align, isZoomable } = attributes;

	const cls = [
		'mo-image',
		align !== 'left' ? `mo-image--${align}` : null,
		isZoomable ? 'mo-image--zoomable' : null
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		file?.caption ? (
			<figure>
				<div className={cls.filter(Boolean).join(' ')} style={{ width: `${size}%` }} data-img-height={`${file?.height}`} data-img-width={`${file?.width}`}>
					<img src={file.url} alt={file.alt} />
				</div>
				<figcaption>{file.caption}</figcaption>
			</figure>
		) : (
			<figure>
				<div className={cls.filter(Boolean).join(' ')} style={{ width: `${size}%` }} data-img-height={`${file?.height}`} data-img-width={`${file?.width}`}>
					<img src={file?.url} alt={file?.alt} />
				</div>
			</figure>
		)
	);
}
