import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import './editor.css';

export default function Edit({ attributes, setAttributes }) {

	const { style, align, size, title } = attributes;

	const cls = [
		'mo-highlight',
		style !== 'default' ? `mo-highlight--${style}` : null,
		align !== 'left' ? `mo-highlight--${align}` : null
	]

	const blockProps = useBlockProps({
		className: cls.filter(Boolean).join(' '),
	})

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Réglages du texte mis en avant', 'cd50')}	>
					<ToggleGroupControl
						label={__('Style', 'cd50')}
						value={style}
						onChange={(value) => setAttributes({ style: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="default" label={__('Défaut', 'cd50')} />
						<ToggleGroupControlOption value="secondary" label={__('Secondaire', 'cd50')} />
						<ToggleGroupControlOption value="neutral" label={__('Neutre', 'cd50')} />
					</ToggleGroupControl>
					<ToggleGroupControl
						label={__('Taille', 'cd50')}
						value={size}
						onChange={(value) => setAttributes({ size: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="25" label={__('25%', 'cd50')} />
						<ToggleGroupControlOption value="50" label={__('50%', 'cd50')} />
						<ToggleGroupControlOption value="75" label={__('75%', 'cd50')} />
						<ToggleGroupControlOption value="100" label={__('100%', 'cd50')} />
					</ToggleGroupControl>
					{size !== '100' && (
						<ToggleGroupControl
							label={__('Alignement', 'cd50')}
							value={align}
							onChange={(value) => setAttributes({ align: value })}
							isBlock
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						>
							<ToggleGroupControlOptionIcon value="left" label={__('Gauche', 'cd50')} icon={alignLeft} />
							<ToggleGroupControlOptionIcon value="center" label={__('Centre', 'cd50')} icon={alignCenter} />
							<ToggleGroupControlOptionIcon value="right" label={__('Droite', 'cd50')} icon={alignRight} />
						</ToggleGroupControl>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps} style={{ width: size !== '100' ? `${size}%` : null }}>
				<RichText
					tagName="div"
					className="mo-highlight__title"
					value={title}
					onChange={(value) => setAttributes({ title: value })}
					allowedFormats={[]}
					placeholder={__('Titre', 'cd50')}
				/>
				<div className="mo-highlight__content">
					<InnerBlocks allowedBlocks={['core/paragraph']} />
				</div>
			</div>
		</>
	);
}
