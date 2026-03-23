---
title: LPML Specification
sidebar_position: 1
---

# LPML Specification

**LPML** (LPC Markup Language) is a human-friendly data serialization format designed for MUD configuration files. It extends JSON5 with features tailored for LPC environments.

## Version

Version: 1.0.0
Created: 2025-11-09

## Design Goals

1. **Human-readable**: Easy to read and write by hand
2. **Composable**: Optional file includes for modular configs
3. **Expressive**: Natural multiline strings without escape hell
4. **Compatible**: Full JSON/JSON5 compatibility
5. **Practical**: Fast enough for config files (not hot paths)
