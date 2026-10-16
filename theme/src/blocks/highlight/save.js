import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { style, align, size, title } = attributes;

	const cls = [
		'mo-highlight',
		style !== 'default' ? `mo-highlight--${style}` : null,
		align !== 'left' ? `mo-highlight--${align}` : null
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		<div {...blockProps} style={{ width: size !== '100' ? `${size}%` : null }}>
			<RichText.Content
				value={title}
				tagName="span"
				className="mo-highlight__title"
			/>
			<div className='mo-highlight__content'>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
