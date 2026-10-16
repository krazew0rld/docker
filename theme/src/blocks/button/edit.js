import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, BlockControls, LinkControl, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	Popover,
	ToolbarButton,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { link as linkIcon, linkOff as linkOffIcon, alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useMergeRefs } from '@wordpress/compose';
import './editor.css';

export default function Edit({ attributes, setAttributes, isSelected }) {

	const { label, link, color, style, align } = attributes;
	const [isEditingLink, setIsEditingLink] = useState(false);
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const ref = useRef();

	const cls = [
		'mo-button',
		color !== 'primary' ? `mo-button--${color}` : null,
		style !== 'fill' ? `mo-button--${style}` : null,
		align !== 'left' ? `mo-button--${align}` : null,
		'wp-block'
	]

	const blockProps = useBlockProps({
		className: cls.filter(Boolean).join(' '),
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
	})

	useEffect(() => {
		!isSelected && setIsEditingLink(false);
	}, [isSelected]);

	useEffect(() => {
		const hasExternalLinkIcon = label?.includes('<i class="fa-solid fa-arrow-up-right-from-square"></i>');
		if (link?.opensInNewTab && !hasExternalLinkIcon) {
			setAttributes({ label: label + '<i class="fa-solid fa-arrow-up-right-from-square"></i>' });
		} else if (!link?.opensInNewTab && hasExternalLinkIcon) {
			setAttributes({ label: label.replace('<i class="fa-solid fa-arrow-up-right-from-square"></i>', '') });
		}
	}, [label, link?.opensInNewTab]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Réglages du bouton', 'cd50')} >
					<ToggleGroupControl
						label={__('Couleur', 'cd50')}
						value={color}
						onChange={(value) => setAttributes({ color: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="primary" label={__('Primaire', 'cd50')} />
						<ToggleGroupControlOption value="secondary" label={__('Secondaire', 'cd50')} />
					</ToggleGroupControl>
					<ToggleGroupControl
						label={__('Style', 'cd50')}
						value={style}
						onChange={(value) => setAttributes({ style: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="fill" label={__('Plein', 'cd50')} />
						<ToggleGroupControlOption value="outline" label={__('Détouré', 'cd50')} />
					</ToggleGroupControl>
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
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarButton
					icon={link ? linkIcon : linkOffIcon}
					label={__('Lien', 'cd50')}
					onClick={() => {
						setIsEditingLink(!isEditingLink);
					}}
				/>
			</BlockControls>
			{isEditingLink && (
				<Popover
					anchor={popoverAnchor}
					style={{
						marginTop: '10px'
					}}
					position={
						align === 'left' ? null : align === 'center' ? null : 'bottom left'
					}
				>
					<LinkControl
						value={link}
						onChange={(value) => setAttributes({ link: value })}
						settings={[
							{
								id: 'opensInNewTab',
								title: __('Ouvrir dans un nouvel onglet', 'cd50')
							}
						]}
						showSuggestions={true}
						showInitialSuggestions={true}
						suggestionsQuery={{
							type: 'post',
							subtype: 'page',
						}}
						onRemove={() => setAttributes({ link: null })}
					/>
				</Popover>
			)}
			<RichText
				{...blockProps}
				tagName="a"
				value={label}
				onChange={(value) => setAttributes({ label: value })}
				allowedFormats={[]}
				placeholder={__('Label du bouton', 'cd50')}
				href={link?.url}
				target={link?.opensInNewTab ? '_blank' : '_self'}
				rel={link?.opensInNewTab ? 'noopener noreferrer' : null}
			/>
		</>
	);
}
