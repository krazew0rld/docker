import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const {} = attributes;

	const cls = [
		'mo-template'
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		<p {...blockProps}>
			{'My First Block – hello from the saved content!'}
		</p>
	);
}
