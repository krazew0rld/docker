import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import './editor.css';

export default function Edit({ attributes, setAttributes }) {

	const { title, style, align, size } = attributes;

	const cls = [
		'mo-accordion',
		style !== 'default' ? `mo-accordion--${style}` : null,
		align !== 'left' ? `mo-accordion--${align}` : null
	]

	const blockProps = useBlockProps()

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Réglages de l\'accordéon', 'cd50')}	>
					<ToggleGroupControl
						label={__('Style', 'cd50')}
						value={style}
						onChange={(value) => setAttributes({ style: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="default" label={__('Défaut', 'cd50')} />
						<ToggleGroupControlOption value="underline" label={__('Souligné', 'cd50')} />
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
			<div {...blockProps}>
				<details className={cls.filter(Boolean).join(' ')} style={{ width: size !== '100' ? `${size}%` : null }}>
					<summary>
						<RichText
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							allowedFormats={[]}
							placeholder={__('Titre de l\'accordéon', 'cd50')}
							tagName="span"
							className="mo-accordion__title"
						/>
						<span className="mo-accordion__icon">
							<i className="fa-solid fa-chevron-down"></i>
						</span>
					</summary>
					<div className="mo-accordion__content">
						<InnerBlocks allowedBlocks={['core/paragraph', 'cd50/button']} />
					</div>
				</details>
			</div>
		</>
	);
}
