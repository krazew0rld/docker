import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { title, size, align } = attributes;

	const cls = [
		'mo-note',
		align !== 'left' ? `mo-note--${align}` : null
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		<div {...blockProps} style={{ width: size !== '100' ? `${size}%` : null }}>
			<div className="mo-note__header">
				<span className="mo-note__icon">
					<i className="fa-solid fa-info fa-2xl"></i>
				</span>
				<RichText.Content
					value={title}
					tagName="span"
					className="mo-note__title"
				/>
			</div>
			<div className="mo-note__content">
				<InnerBlocks.Content allowedBlocks={['core/paragraph', 'cd50/button']} />
			</div>
		</div>
	);
}
