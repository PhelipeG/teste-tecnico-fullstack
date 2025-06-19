import 'package:flutter/material.dart';

class ProviderFilterWidget extends StatelessWidget {
  final String? selectedProvider;
  final void Function(String?) onChanged;

  const ProviderFilterWidget({
    super.key,
    required this.selectedProvider,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        FilterChip(
          label: const Text('Brasileiro'),
          selected: selectedProvider == 'brazilian',
          onSelected: (selected) {
            onChanged(selected ? 'brazilian' : null);
          },
        ),
        const SizedBox(width: 12),
        FilterChip(
          label: const Text('Europeu'),
          selected: selectedProvider == 'european',
          onSelected: (selected) {
            onChanged(selected ? 'european' : null);
          },
        ),
      ],
    );
  }
}
