import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { title, style, align, size } = attributes;

	const cls = [
		'mo-accordion',
		style !== 'default' ? `mo-accordion--${style}` : null,
		align !== 'left' ? `mo-accordion--${align}` : null
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		<details {...blockProps} style={{ width: size !== '100' ? `${size}%` : null }}>
			<summary>
				<RichText.Content
					value={title}
					tagName="span"
					className="mo-accordion__title"
				/>
				<span className="mo-accordion__icon">
					<i className="fa-solid fa-chevron-down"></i>
				</span>
			</summary>
			<div className="mo-accordion__content">
				<InnerBlocks.Content allowedBlocks={['core/paragraph', 'cd50/button']} />
			</div>
		</details>
	);
}
